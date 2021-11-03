import React, {Component} from 'react';
import gameControl from '../modules/gameControl'
import '../index.less'

class GreedySnake extends Component {

    componentDidMount() {
        new gameControl()
    }

    render() {
        return (
            <>
                <div id="main">
                    <div id="stage">
                        <div id="snake">
                            <div/>
                        </div>
                        <div id="food">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                    <div id="score-panel">
                        <div>
                            score:<span id="score">0</span>
                        </div>
                        <div>
                            level:<span id="level">0</span>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default GreedySnake;
