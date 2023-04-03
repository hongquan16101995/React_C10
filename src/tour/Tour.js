export class Tour {
    id
    title
    image
    price
    description
    tourGuide

    constructor(id, title, image, price, description, tourGuide) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
        this.tourGuide = tourGuide;
    }
}
