import styles from './ArticleElement.module.scss'

const ArticleElement = () => {
    return (
        <article className='article'>
            <h1 className='h1'>Brewery H1</h1>
            <h2 className='h2'>Desc H2</h2>
            <h3 className='h3'>subtitle H3</h3>
            <h4 className='h4'>subsubtitle H4</h4>
            <p className='p'>paragraph</p>
        </article>
    )
}

export default ArticleElement