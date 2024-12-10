import { FaStar, FaStarHalf } from "react-icons/fa";
import './style.css'
export default function RatingAndReview({ ratings, reviews }) {
    // Initialize an empty array for stars
    const roundedRating = parseFloat(ratings.toFixed(1));
    const roundedReviews = Math.round(reviews);
    const arrayOfStars = [];
    let temp = ratings;

    // Add full stars while `temp` is greater than or equal to 1
    while (temp >= 1) {
        arrayOfStars.push(<FaStar key={arrayOfStars.length} />);
        temp -= 1;
    }

    // Add a half star if there's remaining value >= 0.5
    if (temp >= 0.5) {
        arrayOfStars.push(<FaStarHalf key={arrayOfStars.length} />);
    }

    // Render the stars, rating, and reviews
    return (
        <div className="RatingAndReview small-font">
            <div className="left">
                <div className="arrayOfStar">
                    {arrayOfStars}
                </div>
                <div className="temp">{`(${roundedRating}/5)`}</div>
            </div>
            <div className="right">{`${roundedReviews} lượt đánh giá`}</div>
        </div>
    );
}
