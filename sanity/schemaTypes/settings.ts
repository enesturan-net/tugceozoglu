import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'footerText',
            title: 'Footer Text',
            description: 'Text to display in the footer (e.g., Copyright 2026)',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            description: 'Add your social media links here',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform Name',
                            type: 'string',
                            initialValue: 'Instagram'
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
    ],
})
