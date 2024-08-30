'use client';

import { DiscussionEmbed } from 'disqus-react';
import { Locale } from "@/i18n";

interface Props {
	url: string,
	id: string,
	title: string,
	locale: Locale,
}

const Discus = ({url, id, title, locale}: Props) => {
	return (
		<DiscussionEmbed
			shortname='aquajoy'
			config={
				{
					url,
					identifier: id,
					title,
					language: locale
				}
			}
		/>
	)
}

export default Discus;