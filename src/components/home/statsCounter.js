import React from "react";
import ReactCounter from "./counter.js";
import { Col, Row } from "reactstrap";


const StatsCounters = (props)=>{
    const {data} = props;

    const firstNumber = data.homepageJson.sections[3].stats[0].value;
    const secondNumber = data.homepageJson.sections[3].stats[1].value;
    const thirdNumber = data.homepageJson.sections[3].stats[2].value;
    const fourthNumber = data.homepageJson.sections[3].stats[3].value;

    return (
        <section className="alk-container statsCounter mb-4 text-center py-4">
            <h2>{data.homepageJson.sections[3].heading}</h2>
            <Row className="pt-4">
                <Col xs={12} sm={6} md={3}>
                    <ReactCounter theNumber={firstNumber} />
                    <p className="text-muted">
                        {data.homepageJson.sections[3].stats[0].title}
                    </p>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <ReactCounter theNumber={secondNumber} />
                    <p className="text-muted">
                        {data.homepageJson.sections[3].stats[1].title}
                    </p>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <ReactCounter theNumber={thirdNumber} />
                    <p className="text-muted">
                        {data.homepageJson.sections[3].stats[2].title}
                    </p>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <ReactCounter theNumber={fourthNumber} />
                    <p className="text-muted">
                        {data.homepageJson.sections[3].stats[3].title}
                    </p>
                </Col>
            </Row>
        </section>
    );
}

export default StatsCounters;