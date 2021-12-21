# `github-actions-tweet-action` (JavaScript action)

This action tweets the content of specific text file.

## Inputs

## `tweet_file`

**Required** File which content to be tweeted. Defaults to `"tweets/latest.txt"`.

## Outputs

## `tweet_id`

ID of tweet.

## Example usage

```yaml
uses: issm/github-actions-tweet-action@master
env:
  TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
  TWITTER_API_KEY_SECRET: ${{ secrets.TWITTER_API_KEY_SECRET }}
  TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
  TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
with:
  tweet_file: ""
```
