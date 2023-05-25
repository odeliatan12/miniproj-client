export interface Login{
    username: string
    password: string
    email: string
    contact: string
    roleId: number
}

export interface googleLogin{
    id: number
    token: string
    role: string
}

export interface User{
    id: number
    userName: string
    email: string
    contact: string
}

export interface UpdateUser{
    username: string
    email: string
    phone: string
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

export interface RestaurantPost{
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
    longtitude: number
    latitude: number
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

export class voucher{
    dealId: string
    newAmount: number

    constructor(dealId: string, newAmount: number){
        this.dealId = dealId;
        this.newAmount = newAmount;
    }
}

export interface vouchers{
    id: string
    dealId: string
    amount: number
    restaurantId: number
    userId: number
}

export interface cuisine{
    id: number
    type: string
}

export interface image{
    id: number
    picture: string
    image_fileType: string
}

export interface mealNames{
    id: number
    name: string
}

export class meals{
    restaurantId: number
    nameId: number
    categoryId: number
    amount: number

    constructor(restaurantId: number, nameId: number, categoryId: number, amount: number) {
        this.restaurantId = restaurantId;
        this.nameId = nameId;
        this.categoryId = categoryId;
        this.amount = amount
    }
}

export interface mealRest{
    name: string
    amount: number
    restaurant_id: number
    address: string
    longitude: number
    latitude: number
    category_name: string
    restaurant_name: string
    contact: string
}

export interface location{
    longitude: number
    latitude: number
    restaurant_name: string
    distance: number
}

export interface distance{
    id: number
    distance: number
}

export class capacity{
    capacity: number
    starttiming: string
    endtiming: string
    restaurantId: number
    
    constructor(capacity: number, starttiming: string, endtiming: string, restaurantId: number){
        this.capacity = capacity
        this.starttiming = starttiming
        this.endtiming = endtiming
        this.restaurantId = restaurantId
    }
}

export interface timing{
    id: number
    startTiming: string
    endTiming: string
    capacity: number
    restaurantId: number
}

export interface reservation{
    pax: number
    timeReserve: number
    dateReserve: string
}

export interface reservationDetails{
    id: number
    restaurantId: number
    dateReserve: string
    pax: number
    capacityId: number
    startTiming: string
    endTiming: string
    name: string
    contact: string
    address: string
}

export class GoogleCalendar{
    id: number
    summary: string
    location: string
    description: string
    date: string
    startDateTime: string
    endDateTime: string

    constructor(id: number, summary: string, location: string, description: string, date: string, startDateTime: string, endDateTime: string){
        this.id = id
        this.summary = summary
        this.location = location
        this.description = description
        this.date = date
        this.startDateTime = startDateTime
        this.endDateTime = endDateTime
    }

}

export interface cuisineType{
    type: string
}