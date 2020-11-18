import React from "react";
import CountUp from "react-countup";
import { Watch } from "scrollmonitor-react";
import Loading from "../loading.jsx";
import PropTypes from "prop-types";

const Counter = props => (
    <h2>
        <CountUp
            start={0}
            end={props.num}
            duration={5}
            separator=","
            redraw={false}
        />
    </h2>
);

Counter.propTypes = {
    num: PropTypes.number,
};

class ReactCounter extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    render() {
        return (
            <>
                {!this.props.isInViewport || this.props.isInViewport ? (
                    <Counter num={Number(this.props.theNumber)} />
                ) : (
                    <Loading className="my-4" />
                )}
            </>
        );
    }
}

ReactCounter.propTypes = {
    isInViewport: PropTypes.bool,
    theNumber: PropTypes.number,
};

export default Watch(ReactCounter);
