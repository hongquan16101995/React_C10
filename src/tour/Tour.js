export class Tour {
    id
    title
    price
    description
    tourGuide

    constructor(id, title, price, description, tourGuide) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.tourGuide = tourGuide;
    }
}
