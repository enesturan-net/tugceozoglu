import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
    name: 'project',
    title: 'Project',
    orderings: [orderRankOrdering],
    type: 'document',
    fields: [
        orderRankField({ type: 'project' }),
        defineField({
            name: 'title',
            title: 'Title',
            description: 'Projenin ana başlığı (örn: Nike Reklam Kampanyası)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'URL\'de görünecek isim. "Generate" butonuna basarak otomatikleştirebilirsin.',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'order',
            title: 'Sıralama Önceliği',
            description: 'Projelerin sitede hangi sırada görüneceğini belirler. Küçük sayılar (1, 2, 3...) önce görünür.',
            type: 'number',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'videoFile',
            title: 'Video File (Optional)',
            description: 'Resim yerine video göstermek istersen yükle (mp4/webm). Boş bırakırsan resim görünür.',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            description: 'Projenin kategorileri (örn: Branding, UI/UX, Motion)',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        }),
        defineField({
            name: 'description',
            title: 'Description',
            description: 'Proje hakkında detaylı açıklama. Bu metin, ziyaretçi projeye tıkladığında açılan pencerede görünür.',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
