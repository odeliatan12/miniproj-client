export interface Login{
    username: string
    password: string
    roleId: number
}

export interface token{
    token: string
    role: string
}

export interface Restaurant{
    id: number
    name: string
    about: string
    resturantLink: string
}

export interface RestaurantDetails{
    id: number
    name: string
    about: string
    contact: string
    restaurantLink: string
    menu: string
    address: string
    cuisine_id: number
    mondayOpening: string
    mondayClosing: string
    tuesdayOpening: string
    tuesdayClosing: string
    wednesdayOpening: string
    wednesdayClosing: string
    thursdayOpening: string
    thursdayClosing: string
    fridayOpening: string
    fridayClosing: string
    saturdayOpening: string
    saturdayClosing: string
    sundayOpening: string
    sundayClosing: string
}

export interface reviews{
    id: number
    description: string
    ratings: number
    userId: number
    restaurantId: number
    timestamp: string
}

export interface ResReviews{
    restaurant: RestaurantDetails
    reviews: reviews[]
}

export interface postReviews{
    ratings: number
    description: string
}

export interface categories{
    id: string
    category: string
}

export interface deals{
    name: string
    originalAmount: number
    newAmount: number
    quantity: number
    category: string
    mondayFrom: string
    mondayTo: string
    tuesdayFrom: string
    tuesdayTo: string
    wednesdayFrom: string
    wednesdayTo: string
    thursdayFrom: string
    thursdayTo: string
    fridayFrom: string
    fridayTo: string
    saturdayFrom: string
    saturdayTo: string
    sundayFrom: string
    sundayTo: string
}

export interface allDeals{
    id: string
    restaurantId: number
    restaurantName: string
    name: string
    originalAmount: number
    newAmount: number
    quantity: number
    category: string
    mondayFrom: string
    mondayTo: string
    tuesdayFrom: string
    tuesdayTo: string
    wednesdayFrom: string
    wednesdayTo: string
    thursdayFrom: string
    thursdayTo: string
    fridayFrom: string
    fridayTo: string
    saturdayFrom: string
    saturdayTo: string
    sundayFrom: string
    sundayTo: string
}

export interface order{
    dealId: string
    price: number
    currency: string
    method: string
    intent: string
    description: string
}

export interface cuisine{
    id: number
    type: string
}