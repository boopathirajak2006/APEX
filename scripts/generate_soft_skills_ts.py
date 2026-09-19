import json
import os

def generate_ts():
    extracted_path = r'c:\Users\Windows11\Desktop\game #1\src\data\source_extracted\soft_skills_extracted.json'
    with open(extracted_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    meta_info = {
        'communication': {
            'name': 'Communication Skills',
            'tagline': 'Master verbal, written, non-verbal, and workplace channel flow',
            'icon': 'MessageSquare',
            'color': '#3B82F6',
            'category': 'Interpersonal & Professional',
            'description': 'Based on the Utkal University Soft Skills Manual by Prof. Kalyani Samantray. Covers 7 Cs of communication, verbal/written channels, non-verbal kinesics & proxemics, group discussions, and emotional intelligence.'
        },
        'teamwork': {
            'name': 'Teamwork & Collaboration',
            'tagline': 'Build high-trust teams, clarify roles, and resolve conflict constructively',
            'icon': 'Users',
            'color': '#10B981',
            'category': 'Team & Culture',
            'description': 'Based on the Apex Teamwork & Collaboration Training Manual. Covers shared purpose, RACI responsibility matrices, psychological safety, Tuckman stages of development, and constructive debate.'
        },
        'leadership': {
            'name': 'Leadership & Ownership',
            'tagline': 'Influence, empower, delegate effectively, and model ethical standards',
            'icon': 'Award',
            'color': '#F59E0B',
            'category': 'Leadership & Influence',
            'description': 'Based on the Apex Leadership Training Manual. Covers vision creation, situational leadership, effective delegation, active coaching, accountability, and ethical decision-making.'
        },
        'problem_solving': {
            'name': 'Problem Solving',
            'tagline': 'Apply structured frameworks, 5 Whys, and root cause analysis',
            'icon': 'Brain',
            'color': '#8B5CF6',
            'category': 'Analytical & Strategic',
            'description': 'Based on the Apex Problem Solving Training Manual. Covers problem definition, root-cause identification, 5 Whys, fishbone diagrams, solution evaluation, and execution monitoring.'
        },
        'critical_thinking': {
            'name': 'Critical Thinking',
            'tagline': 'Evaluate evidence, spot cognitive biases, and stress-test assumptions',
            'icon': 'CheckCircle2',
            'color': '#EC4899',
            'category': 'Cognitive & Analytical',
            'description': 'Based on the Apex Critical Thinking Training Manual. Covers observation vs inference, logical deduction, cognitive bias mitigation, steelmanning, pre-mortems, and metacognition.'
        },
        'time_management': {
            'name': 'Time Management',
            'tagline': 'Prioritize ruthlessly, time block, and defeat procrastination',
            'icon': 'Clock',
            'color': '#6366F1',
            'category': 'Personal Productivity',
            'description': 'Based on the Apex Time Management Training Manual. Covers the Eisenhower matrix, calendar time-blocking, task batching, implementation intentions, Parkinson\'s law, and weekly reviews.'
        },
        'presentation_skills': {
            'name': 'Presentation Skills',
            'tagline': 'Structure impactful messages, design clear slides, and master delivery',
            'icon': 'Presentation',
            'color': '#14B8A6',
            'category': 'Professional Expression',
            'description': 'Based on the Apex Presentation Skills Training Manual. Covers the MOM principle (Message, Order, Manner), audience analysis, slide simplification, vocal dynamics, and hostile Q&A navigation.'
        },
        'interview_skills': {
            'name': 'Interview Skills',
            'tagline': 'Structure STAR evidence, convey value, and ask insightful questions',
            'icon': 'Briefcase',
            'color': '#F97316',
            'category': 'Career Readiness',
            'description': 'Based on the Apex Interview Skills Training Manual. Covers the STAR framework (Situation, Task, Action, Result), behavioral question strategy, technical problem walkthroughs, and post-interview reflection.'
        },
        'adaptability': {
            'name': 'Adaptability & Flexibility',
            'tagline': 'Navigate workplace transitions, unlearn outdated habits, and experiment',
            'icon': 'Sparkles',
            'color': '#06B6D4',
            'category': 'Resilience & Growth',
            'description': 'Based on the Apex Adaptability & Flexibility Training Manual. Covers cognitive flexibility, perspective shifting, rapid unlearning, low-risk experimentation, and change resilience.'
        }
    }
    
    # Generate TypeScript file
    lines = []
    lines.append("import type { SoftSkillMeta, SoftSkillTopic, SoftSkillTestExam, SoftSkillId } from '../../types'")
    lines.append("")
    lines.append("export const ALL_SOFT_SKILL_TOPICS: SoftSkillTopic[] = [")
    
    for skill_id, sdata in data.items():
        meta = meta_info.get(skill_id, {})
        note_sections = sdata.get('noteSections', [])
        source_file = sdata.get('sourceFile', '')
        quiz_bank = sdata.get('quizBank', [])
        
        # Split note sections into 3 levels:
        # Beginner: sections 0..3 (or 0..2)
        # Intermediate: sections 4..6 (or 3..5)
        # Advanced: sections 7..9 (or 6..end)
        
        level_splits = [
            ('beginner', note_sections[:4] if len(note_sections) >= 4 else note_sections[:2]),
            ('intermediate', note_sections[4:7] if len(note_sections) >= 7 else note_sections[2:4]),
            ('advanced', note_sections[7:] if len(note_sections) >= 8 else note_sections[4:])
        ]
        
        for level, secs in level_splits:
            if not secs:
                continue
            for order_idx, sec in enumerate(secs):
                title = sec.get('title', f"Core Concepts {order_idx+1}")
                topic_id = f"{skill_id}_{level}_{order_idx+1}"
                
                # Sample 5 questions for this topic from quiz bank
                topic_quizzes = [
                    {
                        'id': q['id'],
                        'question': q['question'],
                        'options': q['options'],
                        'correctOptionIndex': q['correctAnswer'],
                        'explanation': q['explanation'],
                        'difficulty': q.get('difficulty', level),
                        'topic': q.get('topic', title),
                        'sourceMetadata': q.get('sourceMetadata')
                    }
                    for q in quiz_bank[order_idx*5 : (order_idx+1)*5]
                ]
                if not topic_quizzes and quiz_bank:
                    topic_quizzes = [
                        {
                            'id': q['id'],
                            'question': q['question'],
                            'options': q['options'],
                            'correctOptionIndex': q['correctAnswer'],
                            'explanation': q['explanation'],
                            'difficulty': q.get('difficulty', level),
                            'topic': q.get('topic', title),
                            'sourceMetadata': q.get('sourceMetadata')
                        }
                        for q in quiz_bank[:5]
                    ]
                    
                subsections = sec.get('subsections', [])
                summary_text = subsections[0]['content'][:200] if subsections else f"Structured {level} study of {title}."
                full_exp = sec.get('fullText', '')
                if not full_exp and subsections:
                    full_exp = "\n\n".join([f"### {s.get('subTitle', 'Section')}\n{s.get('content', '')}" for s in subsections])
                    
                # Create authentic workplace examples and situations from the content
                examples = [
                    {
                        'title': f"Practical Application: {subsections[i]['subTitle']}" if i < len(subsections) else f"Key Scenario {i+1}",
                        'scenario': subsections[i]['content'][:280] if i < len(subsections) else "Applying systematic principles under high-pressure team deliverables.",
                        'takeaway': "Focus on evidence-backed decisions and proactive cross-team communication."
                    }
                    for i in range(min(2, len(subsections)))
                ]
                if not examples:
                    examples = [{
                        'title': f"Real-World {title}",
                        'scenario': f"During a cross-functional milestone, team members apply {title} to establish alignment.",
                        'takeaway': f"Mastery of {title} ensures clarity and prevents downstream friction."
                    }]
                    
                situations = [
                    {
                        'situation': f"A deadline is approaching and priority conflict emerges regarding {title}.",
                        'recommendedAction': "Refer to established framework principles, document trade-offs, and communicate transparently.",
                        'whyItWorks': "Objective criteria and documented constraints prevent emotional friction."
                    }
                ]
                
                important_points = [
                    s.get('subTitle', 'Rule') for s in subsections[:4]
                ] if subsections else [f"Understand core principles of {title}", "Apply transparent communication", "Review outcomes regularly"]

                topic_obj = {
                    'id': topic_id,
                    'skillId': skill_id,
                    'level': level,
                    'title': title,
                    'order': order_idx + 1,
                    'summary': summary_text,
                    'explanation': full_exp,
                    'examples': examples,
                    'practicalSituations': situations,
                    'importantPoints': important_points,
                    'quizzes': topic_quizzes,
                    'xpReward': 50,
                    'sourceMetadata': {
                        'sourceFile': source_file,
                        'sourceSection': f"Part 1: {title}",
                        'sourceTopic': title,
                        'subject': 'soft_skills',
                        'authorOrOrigin': meta.get('description', '')
                    }
                }
                lines.append(f"  {json.dumps(topic_obj, indent=2)},")
                
    lines.append("]")
    lines.append("")
    
    # Generate SOFT_SKILLS_LIST
    lines.append("export const SOFT_SKILLS_LIST: SoftSkillMeta[] = [")
    for skill_id, meta in meta_info.items():
        sdata = data.get(skill_id, {})
        source_file = sdata.get('sourceFile', '')
        obj = {
            'id': skill_id,
            'name': meta['name'],
            'tagline': meta['tagline'],
            'icon': meta['icon'],
            'color': meta['color'],
            'category': meta['category'],
            'description': meta['description'],
            'totalTopics': 0, # Will fill dynamically
            'topics': [],
            'sourceMetadata': {
                'sourceFile': source_file,
                'sourceSection': 'Complete Training Manual',
                'sourceTopic': meta['name'],
                'subject': 'soft_skills'
            }
        }
        lines.append(f"  {{")
        lines.append(f"    id: '{skill_id}',")
        lines.append(f"    name: {json.dumps(meta['name'])},")
        lines.append(f"    tagline: {json.dumps(meta['tagline'])},")
        lines.append(f"    icon: {json.dumps(meta['icon'])},")
        lines.append(f"    color: {json.dumps(meta['color'])},")
        lines.append(f"    category: {json.dumps(meta['category'])},")
        lines.append(f"    description: {json.dumps(meta['description'])},")
        lines.append(f"    topics: ALL_SOFT_SKILL_TOPICS.filter(t => t.skillId === '{skill_id}'),")
        lines.append(f"    totalTopics: ALL_SOFT_SKILL_TOPICS.filter(t => t.skillId === '{skill_id}').length,")
        lines.append(f"    sourceMetadata: {json.dumps(obj['sourceMetadata'])}")
        lines.append(f"  }},")
    lines.append("]")
    lines.append("")
    
    lines.append("export const SOFT_SKILLS_MAP: Record<SoftSkillId, SoftSkillMeta> = SOFT_SKILLS_LIST.reduce((acc, s) => {")
    lines.append("  acc[s.id] = s")
    lines.append("  return acc")
    lines.append("}, {} as Record<SoftSkillId, SoftSkillMeta>)")
    lines.append("")
    
    # Generate SOFT_SKILL_TESTS_BANK with all authentic questions from source manuals!
    lines.append("export const SOFT_SKILL_TESTS_BANK: Record<SoftSkillId, SoftSkillTestExam> = {")
    for skill_id, meta in meta_info.items():
        sdata = data.get(skill_id, {})
        source_file = sdata.get('sourceFile', '')
        quiz_bank = sdata.get('quizBank', [])
        
        # Take first 10-15 authentic questions for the exam
        test_questions = [
            {
                'id': q['id'],
                'question': q['question'],
                'options': q['options'],
                'correctOptionIndex': q['correctAnswer'],
                'explanation': q['explanation'],
                'difficulty': q.get('difficulty', 'intermediate'),
                'topic': q.get('topic', meta['name']),
                'sourceMetadata': q.get('sourceMetadata')
            }
            for q in quiz_bank[:10]
        ]
        
        exam_obj = {
            'skillId': skill_id,
            'title': f"{meta['name']} Mastery Assessment",
            'tagline': f"10-Question authentic scenario test derived from {source_file}",
            'icon': meta['icon'],
            'description': f"Comprehensive evaluation of {meta['name']} based strictly on {source_file}.",
            'timeLimitMinutes': 10,
            'questions': test_questions,
            'sourceMetadata': {
                'sourceFile': source_file,
                'sourceSection': 'Part 2: 50-Question Assessment Bank',
                'sourceTopic': meta['name'],
                'subject': 'soft_skills'
            }
        }
        lines.append(f"  '{skill_id}': {json.dumps(exam_obj, indent=4)},")
        
    lines.append("}")
    lines.append("")
    
    out_ts = r'c:\Users\Windows11\Desktop\game #1\src\data\softSkills\index.ts'
    with open(out_ts, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Generated {out_ts}")
    
    # Also write to server/data/softSkillsData.ts
    server_ts = r'c:\Users\Windows11\Desktop\game #1\server\data\softSkillsData.ts'
    with open(server_ts, 'w', encoding='utf-8') as f:
        # replace import path for server
        server_content = '\n'.join(lines).replace("from '../../types'", "from '../types'")
        f.write(server_content)
    print(f"Generated {server_ts}")

if __name__ == '__main__':
    generate_ts()
