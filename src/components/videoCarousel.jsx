import React from "react";
import PropTypes from "prop-types";

class VideoCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            vidClasses: "vc-video bg-transparent",
            containerClasses: "vc-wrap bg-transparent",
            slides: []
        };

        this.handleEnded = this.handleEnded.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
    }

    componentDidMount(){
        let webp = document.querySelector('html').classList.contains('webp');
        this.setState({
            ...this.state,
            slides: this.props.slides,
            webp: webp
        })
    }

    handlePlay = () => {
        this.video.play();
    };

    handleEnded = () => {
        const nextIndex =
            this.state.currentIndex + 1 < this.props.slides.length
                ? this.state.currentIndex + 1
                : 0;
        this.setState({ currentIndex: nextIndex });
    };

    prevSlide = () => {
        var prevSlide =
            this.state.currentIndex - 1 < 0
                ? this.props.slides.length - 1
                : this.state.currentIndex - 1;
        this.setState({
            currentIndex: prevSlide,
        });
    };

    nextSlide = () => {
        var nextSlide =
            this.state.currentIndex + 1 < this.props.slides.length
                ? this.state.currentIndex + 1
                : 0;
        this.setState({
            currentIndex: nextSlide,
        });
    };

    render() {
        return (
            <div className="vc">
                <div className={this.state.containerClasses}>
                    {this.props.showIndicators === true ? (
                        <>
                            <div
                                className="carousel__prev"
                                onClick={this.prevSlide}
                            >
                                ◀︎
                            </div>
                            <div
                                className="carousel__next"
                                onClick={this.nextSlide}
                            >
                                ▶︎
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    {this.props.children}
                    {typeof this.state.slides !== "undefined" ? (
                        <video
                            autoPlay={true}
                            muted={true}
                            preload="auto"
                            playsInline={true}
                            crossOrigin="true"
                            onPlay={this.handlePlay}
                            onEnded={this.handleEnded}
                            className={this.state.vidClasses}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                            }}
                            poster={
                                this.state.webp
                                    ? this.props.slides[this.state.currentIndex]
                                          .webp
                                    : this.props.slides[this.state.currentIndex]
                                          .img
                            }
                            ref={el => {
                                this.video = el;
                            }}
                        >
                            <source src={this.props.slides[this.state.currentIndex].mp4} type="video/mp4"/>
                            <source src={this.props.slides[this.state.currentIndex].webm} type="video/webm"/>
                            Your browser does not support the video tag.
                        </video>
                    ) : null}
                </div>
            </div>
        );
    }
}

VideoCarousel.propTypes = {
    slides: PropTypes.array,
    showIndicators: PropTypes.bool,
    children: PropTypes.object,
};

export default VideoCarousel;
