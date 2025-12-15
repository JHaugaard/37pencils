## Frontmatter Fields

| Field         | Required | Type    | Values/Format                                                |
| ------------- | -------- | ------- | ------------------------------------------------------------ |
| `title`       | Yes      | string  | `"Your Post Title"`                                          |
| `description` | Yes      | string  | `"Brief description for SEO and previews"`                   |
| `pubDate`     | Yes      | date    | `2024-12-14` or `2024-12-14T10:30:00`                        |
| `updatedDate` | No       | date    | Same format as pubDate                                       |
| `status`      | No       | enum    | `"seedling"` | `"growing"` | `"evergreen"` (default: seedling) |
| `tags`        | No       | array   | `["tag1", "tag2"]`                                           |
| `draft`       | No       | boolean | `true` | `false` (default: false)                            |

```yaml
---
title: "Post Title Here"
description: "A sentence or two describing the post"
pubDate: 2024-12-14
updatedDate: 2024-12-15
status: "seedling"
tags: ["topic", "another-topic"]
draft: false
---
```

