const validUrl = require('valid-url')
const isUrl = require('is-url')
const Url = require('../model/url')
const { InvalidUrlError, NotFoundError } = require('../errors')

const postUrl = async (req, res) => {
    const firstCheck = isUrl(req.body.url)
    let originalUrl;
    if (firstCheck) {
        originalUrl = req.body.url.replace(/\/$/, '')
    }
    const findShortUrl = await Url.findOne({}).sort('-short_url')
    let shortUrl;

    if (findShortUrl) {
        shortUrl = findShortUrl.short_url + 1
    } else {
        shortUrl = 1
    }

    if (originalUrl) {
        const findUrl = await Url.findOne(req.body).select('original_url short_url -_id')
        if (!findUrl) {
            const createUrl = await Url.create({ original_url: originalUrl, short_url: shortUrl })
            filterUrl = await Url.findOne({ original_url: originalUrl }).select('original_url short_url -_id')

            return res.status(200).json(filterUrl)
        }
        return res.status(200).json(findUrl)
    } else {
        throw new InvalidUrlError("invalid url")
    }
}

const getUrl = async (req, res) => {
    const test = req.params.short_url.match(/^\d+$/)

    if (!test) {
        throw new InvalidUrlError("Wrong format")
    }

    const getUrl = await Url.findOne(req.params)

    if (!getUrl) {
        throw new NotFoundError("No short URL found for the given input")
    }

    const url = getUrl.original_url

    res.redirect(url)
}

module.exports = {
    postUrl,
    getUrl
}