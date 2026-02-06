import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'secretMessage',
    title: 'Secret Message',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Message Text',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sender',
            title: 'Sender Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'timestamp',
            title: 'Received At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'isVisible',
            title: 'Visible on Site',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'timestamp',
        },
    },
})
