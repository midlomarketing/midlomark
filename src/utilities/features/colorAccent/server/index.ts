import {createServerFeature} from "@payloadcms/richtext-lexical";

export const HighlightFeature = createServerFeature({
    dependenciesSoft: ['italic', 'bold'],
    feature: () => {
        return {
            ClientFeature: `src/utilities/features/colorAccent/client#HighlightFeatureClient`
        }
    },
    key: 'highlight',
})