import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let AppComponent =  class extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
      vue = 'vanilla' + 'react' // 错误代码，vue变量未定义
    }

    render () {
        return (
            <div>
              react app
            </div>
        )
    }
};

ReactDOM.render(<AppComponent/>, document.querySelector('.react-area'));
