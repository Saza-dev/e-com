export const formatPrice = 
(amount:number) => {
    return new Intl.NumberFormat
    ('en-US',{
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

// format the price into USD