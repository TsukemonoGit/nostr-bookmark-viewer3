export class Token {
	constructor(
		readonly name: 'text' | 'reference' | 'hashtag' | 'emoji' | 'url' | 'nip',
		readonly text: string,
		readonly index?: number,
		readonly url?: string
	) {}
}

export class Content {
	static parse(content: string, tags: string[][] = []): Token[] {
		const hashtags = tags
			.filter(([tagName, tagContent]) => tagName === 't' && tagContent !== undefined)
			.map(([, tagContent]) => tagContent);
		hashtags.sort((x, y) => y.length - x.length);
		const emojis = new Map(
			tags
				.filter(
					([tagName, tagContent, url]) =>
						tagName === 'emoji' && tagContent !== undefined && url !== undefined
				)
				.map(([, shortcode, url]) => [shortcode, url])
		);
		const matches = [
			...(hashtags.length > 0
				? content.matchAll(new RegExp(`(${hashtags.map((x) => `#${x}`).join('|')})`, 'g'))
				: []),
			...(emojis.size > 0
				? content.matchAll(new RegExp(`:(${[...emojis.keys()].join('|')}):`, 'g'))
				: []),
			...content.matchAll(/\bnostr:((note|npub|naddr|nevent|nprofile)1\w{6,})\b|#\[\d+\]/g),
			...content.matchAll(/https?:\/\/\S+/g),
			...content.matchAll(/NIP-[0-9]+/g)
		].sort((x, y) => {
			if (x.index === undefined || y.index === undefined) {
				throw new Error('Index is undefined');
			}

			return x.index - y.index;
		});

		const tokens: Token[] = [];
		let index = 0;
		for (const match of matches) {
			const text = match[0];
			const matchIndex = match.index;

			if (matchIndex === undefined || matchIndex < index) {
				continue;
			}

			if (matchIndex > index) {
				tokens.push(new Token('text', content.slice(index, matchIndex)));
			}

			if (text.startsWith('#')) {
				const m = text.match(/#\[(?<i>\d+)]/);
				if (m !== null) {
					const i = Number(m.groups?.i);
					tokens.push(new Token('reference', text, i));
				} else {
					tokens.push(new Token('hashtag', text));
				}
			} else if (text.startsWith(':')) {
				tokens.push(
					new Token(
						'emoji',
						text,
						undefined,
						emojis.get(text.substring(1, text.length - 1))
					)
				);
			} else if (text.startsWith('nostr:')) {
				tokens.push(new Token('reference', text));
			} else if (text.startsWith('NIP-')) {
				tokens.push(new Token('nip', text));
			} else {
				tokens.push(new Token('url', text));
			}

			index = matchIndex + text.length;
		}

		if (index < content.length) {
			tokens.push(new Token('text', content.slice(index, content.length)));
		}

		return tokens;
	}

	static findNpubsAndNprofiles(content: string): string[] {
		const matches = content.matchAll(/(?<=^|\s)(nostr:)?(?<npub>(npub|nprofile)1\w{6,})\b/g);
		return [...matches]
			.map((match) => match.groups?.npub)
			.filter((x): x is string => x !== undefined);
	}

	static findNotesAndNevents(content: string): string[] {
		const matches = content.matchAll(/(?<=^|\s)(nostr:)?(?<note>(note|nevent)1\w{6,})\b/g);
		return [...matches]
			.map((match) => match.groups?.note)
			.filter((x): x is string => x !== undefined);
	}

	static findHashtags(content: string): string[] {
		const matches = content.matchAll(/(?<=^|\s)#(?<hashtag>[\p{Letter}\p{Number}_]+)/gu);
		const hashtags = [...matches]
			.map((match) => match.groups?.hashtag)
			.filter((x): x is string => x !== undefined);
		return Array.from(new Set(hashtags));
	}

	static replaceNip19(content: string): string {
		return content.replaceAll(
			/(?<=^|\s)(nostr:)?((note|npub|naddr|nevent|nprofile)1\w{6,})\b/g,
			'nostr:$2'
		);
	}
}