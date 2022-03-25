import moment from "moment";
import { BlogDTO } from "../../dto/Blog.dto";

export default function BlogTextItem({itemType, image, date, description, id, title, by, href=`/web/blog-post?id=${id}`}:BlogDTO) {
    if (itemType == "simple") {
        return (
        <a href={href} className="post_col">
            <img className="blog_img" src={image} alt={title} />
            <h5><span className="content_date">{moment(date).format("yyyy.MM.DD")}</span></h5>
        </a>
        );
    }
    else {
        return (
            <a href={href} className="post_col">
                <div className="blogTexts">
                    <h4 className="section_subtitle">{title}</h4>
                    <p><span className="blog_span">{by}</span></p>
                    <p className="text_secondary">{(description.length > 100 ? description.substring(0, 100) : description)}
                    </p>
                    <div className="read_more">
                        <div className="line"></div>
                        <h5>Read More</h5>
                    </div>
                </div>
            </a>
        );
    }
}