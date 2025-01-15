import {Block} from 'payload'
import buttons from '../../components/buttons'
import headerSection from "@/components/headerSection";

const cta: Block = {
    slug: 'cta',
    labels: {
        singular: 'CTA',
        plural: 'CTAs',
    },
    fields: [
        headerSection(),
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        buttons()
    ],
  interfaceName: 'CTAProps'
}

export default cta
