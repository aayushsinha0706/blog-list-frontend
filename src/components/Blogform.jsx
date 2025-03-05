const Blogform = ({
    onSubmit,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
}) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>create a new blog</h2>
            <div>
                title: 
                <input 
                    name="title" 
                    type="text" 
                    placeholder="This is an example blog title"
                    value={title} 
                    onChange={({target}) => setTitle(target.value)} 
                />
            </div>
            <div>
                author:
                <input 
                    name="author" 
                    type="text" 
                    placeholder="Example author"
                    value={author}
                    onChange={({target}) => setAuthor(target.value)} 
                />

            </div>
            <div>
                url:
                <input 
                    name="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default Blogform