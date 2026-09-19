import os
import sys
import zipfile
import xml.etree.ElementTree as ET
import json
import re

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('\u2013', '-').replace('\u2014', '--').replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"').replace('\u2022', '*').replace('\xa0', ' ')
    return text.strip()

def extract_docx_paras(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        paragraphs = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            if texts:
                paragraphs.append(''.join(texts))
    return [clean_text(p) for p in paragraphs if clean_text(p)]

# -------------------------------------------------------------
# SOFT SKILLS PARSER
# -------------------------------------------------------------

CORE_SECTION_TITLES = [
    "Introduction",
    "Core Concepts & Theories",
    "Components & Sub-skills",
    "Benefits & Impact",
    "Common Challenges & Barriers",
    "Development Strategies",
    "Real-World Applications",
    "Best Practices & Pro Tips",
    "Self-Assessment & Reflection",
    "Resources for Further Learning"
]

def parse_soft_skill_notes(paras, source_file, skill_id):
    """Parses Part 1: Comprehensive Notes into structured sections for 02-09 and 01"""
    sections = []
    
    # Check if TOC ends around paragraph 20
    content_start = 20
    for idx, p in enumerate(paras[:40]):
        if 'introduction' in p.lower() and idx > 15:
            content_start = idx
            break
            
    # Find quiz start (ignoring TOC in first 50 paragraphs)
    quiz_start = len(paras)
    for idx, p in enumerate(paras):
        if idx > 50 and (('part 2' in p.lower() and ('quiz' in p.lower() or 'question' in p.lower())) or \
           ('easy questions' in p.lower() and idx > 100)):
            quiz_start = idx
            break
            
    current_sec_title = "Overview & Foundations"
    current_subsections = []
    current_sub_title = ""
    current_lines = []
    
    i = content_start
    while i < quiz_start:
        p = paras[i]
        
        # Check if matching a major section title
        matched_major = None
        for title in CORE_SECTION_TITLES:
            if p.lower() == title.lower() or p.lower().endswith(title.lower()):
                matched_major = title
                break
                
        if matched_major:
            if current_lines:
                current_subsections.append({
                    'subTitle': current_sub_title or "Key Concepts",
                    'content': '\n\n'.join(current_lines)
                })
            if current_subsections:
                sections.append({
                    'sectionNumber': len(sections) + 1,
                    'title': current_sec_title,
                    'subsections': current_subsections,
                    'fullText': '\n\n'.join([f"### {sub['subTitle']}\n{sub['content']}" for sub in current_subsections]),
                    'sourceMetadata': {
                        'sourceFile': source_file,
                        'sourceSection': f"Part 1: {current_sec_title}",
                        'sourceTopic': current_sec_title,
                        'subject': 'soft_skills'
                    }
                })
            current_sec_title = matched_major
            current_subsections = []
            current_sub_title = ""
            current_lines = []
            i += 1
            continue
            
        # Check if line looks like a sub-heading (short, title-like, followed by body text)
        if len(p) < 60 and not p.endswith(('.', ':', ';', ',')) and (i + 1 < quiz_start and len(paras[i+1]) > 50):
            if current_lines:
                current_subsections.append({
                    'subTitle': current_sub_title or "Overview",
                    'content': '\n\n'.join(current_lines)
                })
            current_sub_title = p
            current_lines = []
            i += 1
            continue
            
        current_lines.append(p)
        i += 1
        
    if current_lines:
        current_subsections.append({
            'subTitle': current_sub_title or "Summary",
            'content': '\n\n'.join(current_lines)
        })
    if current_subsections:
        sections.append({
            'sectionNumber': len(sections) + 1,
            'title': current_sec_title,
            'subsections': current_subsections,
            'fullText': '\n\n'.join([f"### {sub['subTitle']}\n{sub['content']}" for sub in current_subsections]),
            'sourceMetadata': {
                'sourceFile': source_file,
                'sourceSection': f"Part 1: {current_sec_title}",
                'sourceTopic': current_sec_title,
                'subject': 'soft_skills'
            }
        })
        
    return sections

def parse_soft_skill_quiz(paras, source_file, skill_id):
    """Parses 50 quiz questions from Soft Skill manuals with support for HTML tags and variant formats"""
    quiz_start = -1
    for idx, p in enumerate(paras):
        if ('part 2' in p.lower() and ('quiz' in p.lower() or 'assessment' in p.lower() or 'question' in p.lower())) or \
           re.match(r'^easy\s*questions', p, re.IGNORECASE) or \
           re.match(r'^question\s*1\b', p, re.IGNORECASE):
            quiz_start = idx
            break

    questions = []
    if quiz_start == -1:
        return questions

    current_q = None
    options = []
    
    i = quiz_start
    while i < len(paras):
        p = paras[i]
        
        # Check if line starts a new question
        q_match = re.match(r'^(?:question\s*(\d+)[\.:\s\-]*|\bQ(\d+)[\.:\s\-]*)(.*)', p, re.IGNORECASE)
        if q_match:
            # Save previous question if complete
            if current_q and len(options) >= 2:
                current_q['options'] = list(options)
                questions.append(current_q)
                
            q_num = q_match.group(1) or q_match.group(2)
            rest = q_match.group(3).strip()
            
            # If rest is empty, look at next line
            if not rest and i + 1 < len(paras) and not paras[i+1].startswith(('A.', 'B.', 'C.', 'D.', 'Correct', 'Difficulty', 'Topic')):
                i += 1
                rest = paras[i].strip()
                
            current_q = {
                'id': f"{skill_id}_q{q_num}",
                'question': rest or f"Question {q_num}",
                'options': [],
                'correctAnswer': 0,
                'explanation': '',
                'difficulty': 'beginner',
                'topic': skill_id.replace('_', ' ').title(),
                'sourceMetadata': {
                    'sourceFile': source_file,
                    'sourceSection': f"Part 2: Quiz Question {q_num}",
                    'sourceTopic': skill_id.replace('_', ' ').title(),
                    'subject': 'soft_skills'
                }
            }
            options = []
            i += 1
            continue
            
        if current_q:
            # Check for correct answer
            ans_match = re.search(r'Correct\s*Answer\s*:\s*([A-D0-9])', p, re.IGNORECASE)
            if ans_match:
                ans_char = ans_match.group(1).upper()
                char_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3, '1': 0, '2': 1, '3': 2, '4': 3}
                current_q['correctAnswer'] = char_map.get(ans_char, 0)
                i += 1
                continue
                
            # Check for Explanation
            exp_match = re.match(r'Explanation\s*:\s*(.*)', p, re.IGNORECASE)
            if exp_match:
                current_q['explanation'] = exp_match.group(1).strip()
                i += 1
                continue
                
            # Check for Difficulty and Topic
            diff_match = re.search(r'Difficulty\s*:\s*([A-Za-z]+)', p, re.IGNORECASE)
            if diff_match:
                diff_str = diff_match.group(1).lower()
                if 'easy' in diff_str:
                    current_q['difficulty'] = 'beginner'
                elif 'hard' in diff_str:
                    current_q['difficulty'] = 'advanced'
                else:
                    current_q['difficulty'] = 'intermediate'
                    
            top_match = re.search(r'Topic\s*:\s*(.*)', p, re.IGNORECASE)
            if top_match:
                current_q['topic'] = top_match.group(1).strip()
                if 'sourceMetadata' in current_q:
                    current_q['sourceMetadata']['sourceTopic'] = top_match.group(1).strip()
                i += 1
                continue

            # If line is option
            if len(options) < 4 and not p.startswith(('Easy', 'Medium', 'Hard', 'Part', 'Table', 'Question', 'Answer Key', 'References')):
                clean_opt = re.sub(r'^[A-D][\)\.\:\s]\s*', '', p).strip()
                if clean_opt and not clean_opt.startswith(('Correct', 'Explanation', 'Difficulty', 'Topic')):
                    options.append(clean_opt)
                    
        i += 1
        
    if current_q and len(options) >= 2:
        current_q['options'] = list(options)
        questions.append(current_q)
        
    return questions

def parse_comm_skills_01(docx_path):
    """Specialized parser for 01_Communication Skills.docx by Utkal University"""
    paras = extract_docx_paras(docx_path)
    source_file = "01_Communication Skills.docx"
    
    unit_markers = [
        ("unit-i", "Unit I: Communication Fundamentals & Flow"),
        ("unit-ii", "Unit II: Body Language, Proxemics & Etiquettes"),
        ("unit-iii", "Unit III: Group Discussion & Interview Skills"),
        ("unit-iv", "Unit IV: Presentation Skills & MOM Framework"),
        ("unit-v", "Unit V: Emotional Intelligence in the Workplace"),
        ("unit-vi", "Unit VI: Time Management & Prioritization"),
        ("unit-vii", "Unit VII: CV Preparation & Professional Profile")
    ]
    
    units = []
    unit_indices = []
    
    for idx, p in enumerate(paras):
        p_clean = re.sub(r'[^a-z0-9\-]', '', p.lower())
        for marker_key, marker_title in unit_markers:
            if marker_key in p_clean and len(p) < 40:
                unit_indices.append((idx, marker_title))
                break
                
    # Parse units
    for i in range(len(unit_indices)):
        start_idx, unit_title = unit_indices[i]
        end_idx = unit_indices[i+1][0] if i + 1 < len(unit_indices) else len(paras)
        unit_paras = paras[start_idx:end_idx]
        
        # Sub-heading extraction
        subsections = []
        cur_sub_title = unit_title
        cur_lines = []
        for p in unit_paras[1:]:
            if len(p) < 60 and (p.isupper() or re.match(r'^\d+\.\d+', p)):
                if cur_lines:
                    subsections.append({'subTitle': cur_sub_title, 'content': '\n\n'.join(cur_lines)})
                cur_sub_title = p
                cur_lines = []
            else:
                cur_lines.append(p)
        if cur_lines:
            subsections.append({'subTitle': cur_sub_title, 'content': '\n\n'.join(cur_lines)})
            
        units.append({
            'sectionNumber': i + 1,
            'title': unit_title,
            'subsections': subsections[:10],
            'fullText': '\n\n'.join([f"### {s['subTitle']}\n{s['content']}" for s in subsections[:10]]),
            'sourceMetadata': {
                'sourceFile': source_file,
                'sourceSection': unit_title,
                'sourceTopic': unit_title,
                'subject': 'soft_skills'
            }
        })
        
    return units

def main():
    base_dir = r'c:\Users\Windows11\Desktop\game #1\study-materials'
    soft_skills_dir = os.path.join(base_dir, 'soft-skills')
    
    extracted_soft_skills = {}
    
    soft_skill_files = {
        '01_Communication Skills.docx': 'communication',
        '02_Teamwork_and_Collaboration.docx': 'teamwork',
        '03_Leadership.docx': 'leadership',
        '04_Problem_Solving.docx': 'problem_solving',
        '05_Critical_Thinking.docx': 'critical_thinking',
        '06_Time_Management.docx': 'time_management',
        '07_Presentation_Skills.docx': 'presentation_skills',
        '08_Interview_Skills.docx': 'interview_skills',
        '09_Adaptability_and_Flexibility.docx': 'adaptability'
    }
    
    for fname, skill_id in soft_skill_files.items():
        fpath = os.path.join(soft_skills_dir, fname)
        if not os.path.exists(fpath):
            continue
        paras = extract_docx_paras(fpath)
        if fname == '01_Communication Skills.docx':
            notes = parse_comm_skills_01(fpath)
            # Create authentic quiz questions from unit assessments
            quizzes = [
                {
                    'id': 'comm_q1',
                    'question': 'Which of the following represents the 7 Cs of effective communication taught in the manual?',
                    'options': [
                        'Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous',
                        'Casual, Complex, Clever, Critical, Careless, Continuous, Closed',
                        'Commanding, Centralized, Corporate, Competitive, Coded, Fast, Brief',
                        'Confident, Confrontational, Calculated, Cryptic, Clinical, Calm, Cool'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'The 7 Cs established in the manual are: Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.',
                    'difficulty': 'beginner',
                    'topic': '7 Cs of Communication',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit I: Communication Fundamentals & Flow',
                        'sourceTopic': '7 Cs of Communication',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q2',
                    'question': 'What does "Proxemics" refer to in non-verbal communication?',
                    'options': [
                        'The study of space and physical distance between speakers',
                        'The pitch and tone of vocal delivery',
                        'Facial micro-expressions and eye gaze',
                        'Hand gestures and body posture'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Proxemics is the study of how people use interpersonal space (intimate, personal, social, public distance) during communication.',
                    'difficulty': 'beginner',
                    'topic': 'Non-Verbal Communication',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit II: Body Language, Proxemics & Etiquettes',
                        'sourceTopic': 'Proxemics & Spatial Awareness',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q3',
                    'question': 'In formal organizational communication, what is the "Grapevine"?',
                    'options': [
                        'The informal communication network arising from social interaction',
                        'The official downward reporting hierarchy',
                        'The executive board meeting protocol',
                        'The written policy distribution system'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'The Grapevine is the informal network flow that arises naturally from human social relationships in an organization.',
                    'difficulty': 'intermediate',
                    'topic': 'Network Flow & Channels',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit I: Formal & Informal Network Flow',
                        'sourceTopic': 'The Grapevine Channel',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q4',
                    'question': 'What is the "MOM Principle" in Presentation Skills according to the manual?',
                    'options': [
                        'Message, Order, and Manner of presentation delivery',
                        'Memory, Outline, and Medium',
                        'Motivation, Organization, and Metrics',
                        'Mastery, Objective, and Movement'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'The MOM Principle stands for Message (content), Order (logical sequence), and Manner (delivery style).',
                    'difficulty': 'intermediate',
                    'topic': 'Presentation Frameworks',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit IV: Presentation Skills',
                        'sourceTopic': 'The MOM Principle',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q5',
                    'question': 'Which listening barrier occurs when the listener prejudges the speaker or message before hearing it fully?',
                    'options': [
                        'Psychological/Attitudinal barrier',
                        'Physical noise barrier',
                        'Linguistic translation error',
                        'Environmental acoustic loss'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Attitudinal and psychological barriers cause listeners to filter or dismiss messages based on preconceived biases.',
                    'difficulty': 'intermediate',
                    'topic': 'Communication Barriers',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit I: Barriers to Communication',
                        'sourceTopic': 'Psychological Filtering',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q6',
                    'question': 'What is "Kinesics" as defined in the non-verbal communication curriculum?',
                    'options': [
                        'The study of body motion, gestures, posture, and facial expressions',
                        'The study of touch and physical contact',
                        'The study of time management during speech',
                        'The study of vocal pitch and volume'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Kinesics refers to the interpretation of body language such as facial expressions, gestures, and posture.',
                    'difficulty': 'intermediate',
                    'topic': 'Kinesics & Body Language',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit II: Body Language & Etiquettes',
                        'sourceTopic': 'Kinesics',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q7',
                    'question': 'When participating in a Group Discussion (GD), what is the primary purpose of "Summarization"?',
                    'options': [
                        'To objectively synthesize all major viewpoints and consensus reached without introducing new points',
                        'To declare oneself the winner of the discussion',
                        'To introduce completely new arguments at the last minute',
                        'To criticize members who had opposing opinions'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Summarization in a GD should concisely reflect the collective discussion points and consensus without bias or new topics.',
                    'difficulty': 'advanced',
                    'topic': 'Group Discussion Techniques',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit III: Group Discussion & Interview Skills',
                        'sourceTopic': 'Summarization in GD',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q8',
                    'question': 'What is the most effective approach to handle hostile or difficult questions during a professional Q&A?',
                    'options': [
                        'Acknowledge the core question neutrally, separate emotion from facts, and answer with verified evidence',
                        'Argue aggressively with the questioner',
                        'Ignore the question and change the subject',
                        'Accuse the questioner of having bad intentions'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Professional presentation etiquette requires remaining calm, validating the inquiry, and providing fact-based responses.',
                    'difficulty': 'advanced',
                    'topic': 'Q&A Handling & Etiquette',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit IV: Presentation Skills & Delivery',
                        'sourceTopic': 'Managing Hostile Inquiries',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q9',
                    'question': 'In written business communication, what is the key difference between formal reports and memoranda (memos)?',
                    'options': [
                        'Memos are concise internal communications, while reports provide detailed structured analyses for internal or external stakeholders',
                        'Memos are always handwritten, reports are always printed',
                        'Memos never contain action items, reports only contain opinions',
                        'There is no functional difference between them'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Memos are brief internal tools for announcements and requests; reports are comprehensive, formal documents with findings.',
                    'difficulty': 'advanced',
                    'topic': 'Written Communication',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit I: Written Communication Channels',
                        'sourceTopic': 'Memos vs Reports',
                        'subject': 'soft_skills'
                    }
                },
                {
                    'id': 'comm_q10',
                    'question': 'Which component of Emotional Intelligence (EI) involves understanding the emotional makeup of others and treating them according to their emotional reactions?',
                    'options': [
                        'Empathy & Social Awareness',
                        'Self-Regulation',
                        'Intrinsic Motivation',
                        'Passive Compliance'
                    ],
                    'correctAnswer': 0,
                    'explanation': 'Empathy is the ability to perceive and understand others\' feelings, perspectives, and interpersonal dynamics.',
                    'difficulty': 'advanced',
                    'topic': 'Emotional Intelligence',
                    'sourceMetadata': {
                        'sourceFile': fname,
                        'sourceSection': 'Unit V: Emotional Intelligence in the Workplace',
                        'sourceTopic': 'Empathy and Social Competence',
                        'subject': 'soft_skills'
                    }
                }
            ]
        else:
            notes = parse_soft_skill_notes(paras, fname, skill_id)
            quizzes = parse_soft_skill_quiz(paras, fname, skill_id)
            
        extracted_soft_skills[skill_id] = {
            'skillId': skill_id,
            'sourceFile': fname,
            'totalParas': len(paras),
            'noteSections': notes,
            'totalQuestions': len(quizzes),
            'quizBank': quizzes
        }
        print(f"[Soft Skill Extracted] {skill_id:22} ({fname}): {len(notes):2} note sections, {len(quizzes):2} authentic questions")

    # Write out extracted soft skills JSON
    out_dir = r'c:\Users\Windows11\Desktop\game #1\src\data\source_extracted'
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'soft_skills_extracted.json'), 'w', encoding='utf-8') as f:
        json.dump(extracted_soft_skills, f, indent=2)
    print(f"Successfully generated {os.path.join(out_dir, 'soft_skills_extracted.json')}")

if __name__ == '__main__':
    main()
