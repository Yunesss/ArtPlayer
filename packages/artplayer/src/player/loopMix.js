import { def, clamp } from '../utils';

export default function loopMix(art) {
    let interval = [];
    def(art, 'loop', {
        get: () => interval,
        set: (value) => {
            if (Array.isArray(value) && typeof value[0] === 'number' && typeof value[1] === 'number') {
                const start = clamp(value[0], 0, Math.min(value[1], art.duration));
                const end = clamp(value[1], start, art.duration);
                interval = [start, end];
            } else {
                interval = [];
            }
        },
    });

    art.on('video:timeupdate', () => {
        if (interval.length) {
            if (art.currentTime < interval[0] || art.currentTime > interval[1]) {
                art.seek = interval[0];
            }
        }
    });
}
