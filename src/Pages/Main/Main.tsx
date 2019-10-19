import React, { Component } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown-now';


/**
 * This is App.
 */
class Main extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <div className="bg-g1 size1 flex-w flex-col-c-sb p-l-15 p-r-15 p-t-55 p-b-35 respon1">
                <span />
                <div className="flex-col-c p-t-50 p-b-50">
                    <h3 className="l1-txt1 txt-center p-b-10">
                        Coming Soon
                    </h3>

                    <p className="txt-center l1-txt2 p-b-60">
                        Our website is under construction
                    </p>

                    <Countdown
                        date={new Date(2019, 12, 5, 19, 0, 0)}
                        renderer={this.renderCountdown}
                    />

                    <button className="flex-c-m s1-txt2 size3 how-btn" data-toggle="modal" data-target="#subscribe">
                        Follow us for update now!
                    </button>
                </div>

                <span className="s1-txt3 txt-center">
                    @ 2017 Coming Soon Template. Designed by Colorlib
                </span>
            </div>
        );
    }

    /**
     * render the countdown
     */
    private renderCountdown = (countdown: CountdownTimeDelta) => {
        if (countdown.completed) {
            // Render a completed state
            return 'Done!';
        } else {
            // Render a countdown
            return (
                <div className="flex-w flex-c cd100 p-b-82">
                    <div className="flex-col-c-m size2 how-countdown">
                        <span className="l1-txt3 p-b-9 days">{countdown.days}</span>
                        <span className="s1-txt1">Days</span>
                    </div>

                    <div className="flex-col-c-m size2 how-countdown">
                        <span className="l1-txt3 p-b-9 hours">{countdown.hours}</span>
                        <span className="s1-txt1">Hours</span>
                    </div>

                    <div className="flex-col-c-m size2 how-countdown">
                        <span className="l1-txt3 p-b-9 minutes">{countdown.minutes}</span>
                        <span className="s1-txt1">Minutes</span>
                    </div>

                    <div className="flex-col-c-m size2 how-countdown">
                        <span className="l1-txt3 p-b-9 seconds">{countdown.seconds}</span>
                        <span className="s1-txt1">Seconds</span>
                    </div>
                </div>
            );
        }
    }
}

export default Main;
