export interface Login{
    username: string
    password: string
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
    name: string
    about: string
    contact: string
    restaurantLink: string
    menu: string
    image: string
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