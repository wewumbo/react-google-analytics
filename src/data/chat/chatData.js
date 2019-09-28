import user1 from '../../assets/images/users/1.jpg';
import user2 from '../../assets/images/users/2.jpg';
import user3 from '../../assets/images/users/3.jpg';
import user4 from '../../assets/images/users/4.jpg';
import user5 from '../../assets/images/users/5.jpg';
import user6 from '../../assets/images/users/6.jpg';
import user7 from '../../assets/images/users/7.jpg';
import user8 from '../../assets/images/users/8.jpg';
import user9 from '../../assets/images/users/9.jpg';
import user10 from '../../assets/images/users/10.jpg';

const chatData = [
    {
        id: 1,
        name: "James Johnson",
        status: "online",
        session: "abc",
        thumb: user1,
        recent: false,
        excerpt: 'Theme Developer',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1: {
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    } 
    
];

export default chatData;
