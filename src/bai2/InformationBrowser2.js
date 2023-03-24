import {Component} from "react";

export default class InformationBrowser2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: navigator.userAgent,
            age: 26
        }
    }

    componentWillMount() {
        console.log("Hello every:" + new Date().getMilliseconds())
        for (let i = 0; i < 1000000; i++) {}
    }

    render() {
        return (
            <div>
                <h1>Đây là Infor2</h1>
                <h2>{this.state.name}</h2>
                <h2>{this.state.age}</h2>
                <h2>{this.props.test[0].name}</h2>
                <h2>Hello: + {new Date().getMilliseconds()}</h2>
                <button onClick={() => this.m1()}>TestEvent</button>
            </div>
        )
    }

    componentDidMount() {
        console.log("Bye:" + new Date().getMilliseconds())
    }

    m1 = () => {
        this.setState(() => {
            return {
                name: "CodeGym"
            }
        })
    }
}
