const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
    console.log("Server running on port 8000");
});

const tourGuides = [
    {
        id: 1,
        name: "John",
        salary: 1000000
    },
    {
        id: 2,
        name: "Mary",
        salary: 1500000
    }
]

const tours = [
    {
        id: 1,
        title: 'Sapa',
        price: '2000000',
        description: 'SaPa là một điểm du lịch.',
        tourGuide: {
            id: 1,
            name: "John",
            salary: 1000000
        }
    },
    {
        id: 2,
        title: 'Ninh Bình',
        price: '1600000',
        description: 'Ninh Bình là vùng đất có bề dày về lịch sử.',
        tourGuide: {
            id: 1,
            name: "John",
            salary: 1000000
        }
    },
    {
        id: 3,
        title: 'Hà Giang',
        price: '1600000',
        description: 'Hà Giang là một tỉnh thuộc vùng Đông Bắc Việt Nam.',
        tourGuide: {
            id: 2,
            name: "Mary",
            salary: 1500000
        }
    }
];

app.get("/tours", (req, res) => {
    res.json(tours);
});
app.get("/tours/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTourIndex(id);
    if(index !== -1) {
        res.json(tours[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/tours", (req, res) => {
    let index = findTourGuideIndex(+req.body.tourGuide.id)
    let tourGuide = tourGuides[index]
    const tour = {
        id: (new Date()).getTime(),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        tourGuide: tourGuide
    };
    tours.push(tour);
    res.json(tour);
});
app.delete("/tours/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTourIndex(id);
    if(index !== -1) {
        tours.splice(index, 1);
        res.json({message: 'Tour deleted successfully', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/tours/:id", (req, res) => {
    let i = findTourGuideIndex(+req.body.tourGuide.id)
    let tourGuide = tourGuides[i]
    const id = +req.params.id;
    const index = findTourIndex(id);
    if(index !== -1) {
        const tour = tours[index];
        tour.title = req.body.title;
        tour.price = req.body.price;
        tour.description = req.body.description;
        tour.tourGuide = tourGuide;
        res.json(tour);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findTourIndex(id) {
    for(let i = 0; i < tours.length; i++) {
        if(tours[i].id === id) {
            return i;
        }
    }
    return -1;
}

app.get("/tour-guide", (req, res) => {
    res.json(tourGuides);
});

app.get("/tour-guide/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTourGuideIndex(id);
    if(index !== -1) {
        res.json(tourGuides[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findTourGuideIndex(id) {
    for(let i = 0; i < tourGuides.length; i++) {
        if(tourGuides[i].id === id) {
            return i;
        }
    }
    return -1;
}

