import React, {Component} from 'react';
import { Route } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            //hasError: false,
            error: null,
            errorInfo: null,
        }
    }
    
    componentDidCatch(error, errorInfo) {
        this.setState(
            {
                error: error,
                errorInfo: errorInfo,
            }
        )
    }
    
    
    /*
    static getDerivedStateFromError(error){
        return {hasError: true};
    }
    */


    render(){
            if(this.state.error){
                return (
                    <Route path = {this.props.path}>
                        <h2>Something went wrong</h2>
                        <details style={{whiteSpace: 'pre-wrap'}}>
                            {this.state.error.toString()}
                            <br/>
                            {this.state.errorInfo.componentStack}
                        </details>    
                    </Route>
                )
            }
            return this.props.children;
    }
}

export default ErrorBoundary;

