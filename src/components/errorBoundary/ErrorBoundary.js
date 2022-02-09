import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) { // этот метод только лишь обновляет стэйт и ничего больше
    //     return {error: true}  // Если вкратце, то статические свойства — это свойства класса, а не экземпляра класса.
    // }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);// данный метод не только меняет стэйт , но так же может 
        // работать с error и errorInfo, например вывести их в консоль или отправить ошибки на сервер для инфы
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return this.props.children;
    }

    
}

export default ErrorBoundary