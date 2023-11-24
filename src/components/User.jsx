import { Component } from 'react';
import { FaGithub } from "react-icons/fa";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserInfo: {}
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch("https://api.github.com/users/R3MODAS");
            if (!response.ok) {
                const err = response.status;
                throw new Error(err);
            } else {
                const json = await response.json();
                this.setState({ UserInfo: json })
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { UserInfo } = this.state;

        const { name, avatar_url: userImg, html_url: link, location } = UserInfo;

        return (
            <div className='bg-[url("/images/aboutbg.jpg")] bg-cover w-full pt-24 pb-5'>

                <div className='container mx-auto text-center text-white flex flex-col justify-center items-center min-h-screen custom-shadow'>
                    <h2 className="font-GrotBlack text-2xl md:text-4xl pt-5 pb-3 lg:pb-5">Purpose of Spicy Pricey 😉</h2>
                    <p className='font-GrotMed px-4 w-full lg:p-0 lg:w-[800px] text-base md:text-xl mx-auto'>Spicy Pricey is a place where you can get all sorts of Restaurants where you can order anything, anytime you desire 🔥. This works on Swiggy's Live Data so you will get all the features of the Food Ordering App 😁</p>

                    <div className='mt-5 flex justify-center items-center gap-5 flex-col sm:flex-row'>
                        <div>
                            <img className='w-60 rounded-full' src={userImg} alt="img" />
                        </div>
                        <div className='text-center sm:text-left italic'>
                            <h3 className='font-GrotBold text-xl sm:text-2xl'>Name: {name}</h3>
                            <h3 className='font-GrotBold text-xl sm:text-2xl'>Location: {location}</h3>
                            <h3 className='font-GrotBold text-xl sm:text-2xl flex items-center justify-center sm:justify-start gap-2'>Follow me on <a href={link} target='_blank'><FaGithub /></a></h3>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default User