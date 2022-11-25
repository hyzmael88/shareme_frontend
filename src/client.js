import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-11-17',
    useCDN: true,
    token:import.meta.env.VITE_REACT_APP_SANITY_TOKEN,

})
const builder=imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)