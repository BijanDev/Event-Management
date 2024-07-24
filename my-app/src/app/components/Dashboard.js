/* eslint-disable @next/next/no-img-element */
import './app.css';
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

export default function Dashboard() {
    gsap.to(yourElement, {
        duration: 2,
        text: "This is the new text",
        ease: "none",
      });

    return (
        <div id="app">
            <div className="title">
                <div className="title-inner">
                    <div className="cafe">
                        <div className="cafe-inner">Book Your</div>
                    </div>
                    <div className="mozart">
                        <div className="mozart-inner">Event Now</div>
                    </div>
                </div>
            </div>

            <div className="image">
                <img src='https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Cafe' />
            </div>

            <div className="text">
                <div className="text-inner">
                    <p>
                        yourElement
                    </p>
                </div>
            </div>
        </div>
    );
}
