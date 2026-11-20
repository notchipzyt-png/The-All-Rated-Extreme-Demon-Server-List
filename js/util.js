// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function getYoutubeIdFromUrl(url) {
    return url.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
    )?.[1] ?? '';
}

export function getMedalClipIdFromUrl(url) {
    return url.match(
        /medal\.tv\/(?:games\/[^/]+\/)?clips\/([^/?#]+)/i,
    )?.[1] ?? '';
}

export function getTikTokVideoIdFromUrl(url) {
    try {
        const parsedUrl = new URL(url);
        if (!/(^|\.)tiktok\.com$/i.test(parsedUrl.hostname)) return '';

        return parsedUrl.pathname.match(/\/video\/(\d+)/i)?.[1] ?? '';
    } catch {
        return '';
    }
}

export function embed(video) {
    if (!video) return null;

    const medalClipId = getMedalClipIdFromUrl(video);
    if (medalClipId) {
        return `https://medal.tv/clip/${medalClipId}/embed`;
    }

    const youtubeId = getYoutubeIdFromUrl(video);
    if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`;

    const tikTokVideoId = getTikTokVideoIdFromUrl(video);
    return tikTokVideoId
        ? `https://www.tiktok.com/player/v1/${tikTokVideoId}`
        : null;
}

export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 3 });
}

export function getThumbnailFromId(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
