import os

src_dir = r'src'
patterns = [
    "font-['Inter',sans-serif]",
    "font-['Inter', sans-serif]",
    "font-['Outfit', sans-serif]",
    "font-['Poppins', sans-serif]",
    "font-['Roboto', sans-serif]"
]

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts') or f.endswith('.css'):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as fh:
                content = fh.read()
            changed = False
            for p in patterns:
                if p in content:
                    content = content.replace(p, '')
                    changed = True
            if changed:
                with open(fpath, 'w', encoding='utf-8') as fh:
                    fh.write(content)
                print(f'Cleaned extra font override in: {fpath}')
print('Done cleaning extra font overrides.')
