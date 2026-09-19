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
# CODING SOURCE EXTRACTOR
# -------------------------------------------------------------

def extract_coding_curriculum():
    base_dir = r'c:\Users\Windows11\Desktop\game #1\study-materials\coding'
    coding_files = {
        'python': ('Python tutorial.docx', 'Official Python 3.7.0 Tutorial by Guido van Rossum'),
        'typescript': ('TypeScript.docx', 'TypeScript Notes for Professionals (GoalKicker)'),
        'html': ('html tutorial.docx', 'HTML Comprehensive Specification Tutorial'),
        'javascript': ('javascript tutorial.docx', 'JavaScript from Beginner to Professional by Laurence Lars Svekis'),
        'c': ('c tutorial.docx', 'C Programming for the Absolute Beginner by Michael Vine'),
        'cpp': ('c++ tutorial.docx', 'C++ Tutorial (Bjarne Stroustrup / Standard C++)'),
        'java': ('java tutorial.docx', 'Introduction to Programming Using Java by David J. Eck'),
        'rust': ('rust.docx', 'Comprehensive Rust by Martin Geisler'),
        'sql': ('sql.docx', 'SQL Basics by Dr. Sanjeev Verma'),
        'web_dev': ('WEB APPLICATION DEVELOPMENT.docx', 'Web Application Development Lecture Notes (MRCET)')
    }
    
    coding_extracted = {}
    for lang, (fname, author) in coding_files.items():
        fpath = os.path.join(base_dir, fname)
        if not os.path.exists(fpath):
            continue
        paras = extract_docx_paras(fpath)
        coding_extracted[lang] = {
            'language': lang,
            'sourceFile': fname,
            'authorOrOrigin': author,
            'totalParas': len(paras),
            'totalChars': sum(len(p) for p in paras),
            'first100Paras': paras[:100]
        }
        print(f"[Coding Extracted] {lang:12} ({fname}): {len(paras)} paras, {sum(len(p) for p in paras)} chars")
        
    out_dir = r'c:\Users\Windows11\Desktop\game #1\src\data\source_extracted'
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'coding_extracted.json'), 'w', encoding='utf-8') as f:
        json.dump(coding_extracted, f, indent=2)
    print(f"Successfully generated {os.path.join(out_dir, 'coding_extracted.json')}")

if __name__ == '__main__':
    extract_coding_curriculum()
