const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-primary">About Us</h1>
      <div className="card">
        <p className="text-gray-300 text-lg leading-relaxed">
          This project was built for the Hackathon. It features full authentication,
          role-based access control, CRUD operations, file uploads with Cloudinary,
          and is fully containerized with Docker.
        </p>
      </div>
    </div>
  )
}

export default About