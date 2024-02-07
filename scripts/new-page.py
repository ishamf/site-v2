#!/usr/bin/env python3

import os
import datetime
from os.path import abspath, dirname, join, normpath
import re


project_dir = normpath(join(dirname(abspath(__file__)), '..'))


def resolve_from_projectdir(*args):
    return normpath(join(project_dir, *args))


title = input('Enter a title: ')

slugified_title = re.sub(r'[^a-z0-9-]+', '-', title.lower())

slug = input(f'Enter a slug (default {slugified_title}): ')
slug = slug if slug else slugified_title



post_dir = resolve_from_projectdir('src/posts', '{}-{}'.format(datetime.date.today().strftime('%Y-%m-%d'), slug))
os.mkdir(post_dir)

post_file = join(post_dir, '+page.mdx')

post_content = '''
---
title: {title}
slug: {slug}
created: {created}
description: >
  Add description here.
---
'''.strip().format(title=title, slug=slug, created=datetime.datetime.now().isoformat())

with open(post_file, 'w') as f:
    f.write(post_content)