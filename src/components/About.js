import React, { useState, useEffect } from "react";
import "../styles/About.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AboutPage = () => {
	const profileImageUrl =
		"https://user-images.githubusercontent.com/74038190/235224431-e8c8c12e-6826-47f1-89fb-2ddad83b3abf.gif";
	const [projects, setProjects] = useState([
		{
			title: "Aesthetic Intelligence",
			imageUrl:
				"https://cdn-cjhgk.nitrocdn.com/CXxGixRVyChwAxySbAyltuCiQXRKaWDN/assets/images/optimized/rev-e29aa1c/www.newbeauty.com/wp-content/uploads/2024/04/ai-good-bad-ugly-2-1024x614.jpg",
		},
		{
			title: "iAB.logs",
			imageUrl:
				"https://aeolidia.com/wp-content/uploads/2015/03/no-blog-body-615x410.jpg",
		},
		{
			title: "CV-Extractor",
			imageUrl: "https://i-abnormal.netlify.app/images/cv.webp",
		},
		{
			title: "The Pensieve",
			imageUrl:
				"https://raw.githubusercontent.com/iABn0rma1/The.Pensieve-Project/main/assets/img/pensieve.jpeg",
		},
		{
			title: "Epic Games Scraper",
			imageUrl: "https://i-abnormal.netlify.app/images/steam.webp",
		},
		// Break point
		{
			title: "Aesthetic Intelligence",
			imageUrl:
				"https://cdn-cjhgk.nitrocdn.com/CXxGixRVyChwAxySbAyltuCiQXRKaWDN/assets/images/optimized/rev-e29aa1c/www.newbeauty.com/wp-content/uploads/2024/04/ai-good-bad-ugly-2-1024x614.jpg",
		},
		{
			title: "iAB.logs",
			imageUrl:
				"https://aeolidia.com/wp-content/uploads/2015/03/no-blog-body-615x410.jpg",
		},
		{
			title: "CV-Extractor",
			imageUrl: "https://i-abnormal.netlify.app/images/cv.webp",
		},
		{
			title: "The Pensieve",
			imageUrl:
				"https://raw.githubusercontent.com/iABn0rma1/The.Pensieve-Project/main/assets/img/pensieve.jpeg",
		},
		{
			title: "Epic Games Scraper",
			imageUrl: "https://i-abnormal.netlify.app/images/steam.webp",
		},
	]);

	// FAQs data with href routes
	const [faqs, setFaqs] = useState([
		{
			question: "What is WallpaperHub?",
			answer: "WallpaperHub is a platform where users can explore, upload, and manage a collection of wallpapers.",
			link: null, // No link here, just text.
			open: false,
		},
		{
			question: "How can I upload wallpapers?",
			answer: (
				<>
					You can upload wallpapers by navigating to the{" "}
					<a href="/add-wallpaper">Upload</a> section and following
					the instructions.
				</>
			),
			link: null, // Embedded link in the answer.
			open: false,
		},
		{
			question: "Can I search for specific wallpaper collections?",
			answer: (
				<>
					Yes, use the search bar on the top to find specific
					collections based on themes or keywords.
				</>
			),
			link: null, // No link here, just text.
			open: false,
		},
	]);

	const toggleFAQ = (index) => {
		setFaqs(
			faqs.map((faq, i) =>
				i === index
					? { ...faq, open: !faq.open }
					: { ...faq, open: false }
			)
		);
	};

	useEffect(() => {
		document.title = "About the Developer - WallpaperHub";
		document
			.querySelector('meta[name="description"]')
			.setAttribute(
				"content",
				"Learn about the developer behind WallpaperHub and other exciting projects."
			);
	}, []);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	};

	return (
		<div className="about-page">
			<div className="profile-section">
				<img
					src={profileImageUrl}
					alt="Profile"
					className="profile-image"
				/>
				<div className="profile-details">
					<h1>Hello,</h1>
					<p>
						Welcome to WallpaperHub! I'm a passionate developer with
						experience in machine learning, web development, and more creative
						projects. Below, you'll find more about this platform
						and some of my other projects.
					</p>
				</div>
			</div>

			<h2>More Projects</h2>
			<div className="carousel-section">
				<Carousel
					responsive={responsive}
					infinite={true}
					autoPlay={true}
					autoPlaySpeed={3000}
				>
					{projects.map((project, index) => (
						<div
							key={index}
							className="project-card"
						>
							<img
								src={project.imageUrl}
								alt={project.title}
								className="project-image"
							/>
							<h3>{project.title}</h3>
						</div>
					))}
				</Carousel>
			</div>

			<h2>FAQs</h2>
			<div className="faqs-section">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className={`faq ${faq.open ? "open" : ""}`}
						onClick={() => toggleFAQ(index)}
					>
						<div className="faq-question">
							<h3>{faq.question}</h3>
							<span className="faq-toggle">
								{faq.open ? "-" : "+"}
							</span>
						</div>
						<div
							className="faq-answer"
							style={{ maxHeight: faq.open ? "500px" : "0px" }}
						>
							<p>{faq.answer}</p>
						</div>
					</div>
				))}
			</div>

			<div className="about-footer">
				<p>
					Thanks for visiting! Check out the{" "}
					<a href="/add-wallpaper">Upload Section</a> to add more amazing
					wallpapers!
				</p>
			</div>
		</div>
	);
};

export default AboutPage;
