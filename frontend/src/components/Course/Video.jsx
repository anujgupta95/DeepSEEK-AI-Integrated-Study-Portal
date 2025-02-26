export default function Video({module}) {
    return (
        <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={module.url}
            title={module.title}
            className="absolute top-0 left-0 w-full h-full rounded-md"
            allowFullScreen
          ></iframe>
        </div>
    )
}