import os
import re
import glob

# 1. Clean server/data/skillCheckBank.ts
skill_bank_path = os.path.join('server', 'data', 'skillCheckBank.ts')
if os.path.exists(skill_bank_path):
    with open(skill_bank_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean python challenge starterCode
    content = re.sub(
        r"starterCode:\s*'def solution\(nums\):[\s\S]*?print\(solution\(\[1, 2, 3, 4\]\)\)\\n',",
        "starterCode: 'def solution(nums):\\n    # Write your solution here\\n    pass\\n\\nprint(solution([1, 2, 3, 4]))\\n',",
        content
    )
    # Clean js challenge starterCode
    content = re.sub(
        r"starterCode:\s*'function solution\(arr\)[\s\S]*?console\.log\(solution\(\[1, 2, 3, 4\]\)\);\\n',",
        "starterCode: 'function solution(arr) {\\n  // Write your solution here\\n}\\n\\nconsole.log(solution([1, 2, 3, 4]));\\n',",
        content
    )
    # Clean ts challenge starterCode
    content = re.sub(
        r"starterCode:\s*'function solution\(name: string, score: number\)[\s\S]*?console\.log\(solution\(\"Cipher\", 95\)\);\\n',",
        "starterCode: 'function solution(name: string, score: number): string {\\n  // Write your solution here\\n  return \"\";\\n}\\n\\nconsole.log(solution(\"Cipher\", 95));\\n',",
        content
    )
    # Clean other console.log starterCodes in skillCheckBank
    content = re.sub(r"starterCode:\s*'console\.log\([^)]+\);\\n',", "starterCode: '// Write your solution code here\\n',", content)

    with open(skill_bank_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cleaned server/data/skillCheckBank.ts")

# 2. Clean src/data/curriculum/languages/*.ts
lang_dir = os.path.join('src', 'data', 'curriculum', 'languages')
for fpath in glob.glob(os.path.join(lang_dir, '*.ts')):
    fname = os.path.basename(fpath).lower()
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()

    if 'sql' in fname:
        prompt = "-- Write your SQL query / solution code here\\n"
    elif 'html' in fname:
        prompt = "<!-- Write your HTML / solution code here -->\\n"
    elif 'py' in fname:
        prompt = "# Write your Python code here\\n"
    else:
        prompt = "// Write your solution code here\\n"

    # Replace any console.log(...) or direct solution inside codingChallenge starterCode
    # Matches starterCode: `console.log(...);` or starterCode: 'console.log(...);'
    new_c = re.sub(
        r'(codingChallenge:\s*\{[\s\S]*?starterCode:\s*)(`[^`]*`|\'[^\']*\'|"[^"]*")',
        lambda m: m.group(1) + f"`{prompt}`" if ('console.log' in m.group(2) or 'print(' in m.group(2) or len(m.group(2)) < 50) else m.group(0),
        c
    )

    if new_c != c:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_c)
        print(f"Cleaned codingChallenge starterCode in {fname}")
    else:
        print(f"No changes needed in {fname}")

print("Completed cleaning starter codes.")
