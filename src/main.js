const core = require('@actions/core')
const fs = require('fs-extra')
const Twitter = require('twitter')

async function main () {
  try {
    // ツイート内容を記述したファイルの指定を受け取る
    const tweetFile = core.getInput('tweet_file')
    core.info(`tweet file: ${tweetFile}`)

    // 指定ファイルの存在をチェックする
    try {
      await fs.stat(tweetFile)
    } catch (e) {
      core.error(`no such file: ${tweetFile}`)
      process.exit(1)
    }
    core.info('tweet file has found.')

    // ファイルの内容を読み込む`
    const buff = await fs.readFile(tweetFile)
    const tweetText = buff.toString().trim()
    if (tweetText.length === 0) {
      // 内容が空であれば何もせず正常終了する
      core.info('tweet text if empty, do nothing.')
      process.exit(0)
    }

    // 内容を1行化してログとして出力する
    const tweetText4Log = tweetText.replace(/\n/g, '\\n')
    core.info(`tweet txt: ${tweetText4Log}`)

    // ツイートする
    const twitterClientOptions = {
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_KEY_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
    const client = new Twitter(twitterClientOptions)

    const statusParams = {
      status: tweetText
    }
    const tweet = await client.post('statuses/update', statusParams)
    const { id_str: tweetIdStr } = tweet

    core.setOutput('tweet_id', tweetIdStr)
  } catch (e) {
    core.error(e.message)
    process.exit(1)
  }
}

main()
