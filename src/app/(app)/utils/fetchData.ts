export const getAllGroups = async () =>
    await fetch(`https://${process.env.PCO_EP}/groups?include=location,group_type`, {
        headers: {
            Authorization: `Basic ${process.env.SECRET}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })

export const getGroupType = async () =>
    await fetch(`https://${process.env.PCO_EP}/group_types?filter=church_center_visible`, {
        headers: {
            Authorization: `Basic ${process.env.SECRET}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
