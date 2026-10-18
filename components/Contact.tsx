import { site } from '@/data/site';
import Ornament from './Ornament';

export default function Contact() {
  const instagram = site.social.find((s) => s.label === 'Instagram');

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-2xl px-5 md:px-10">
        <div className="panel px-7 py-14 text-center md:px-14 md:py-16">
          <p className="label">Stay in touch</p>
          <h2 className="heading mt-4 text-4xl md:text-5xl">Let&rsquo;s Keep in Touch</h2>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-7 max-w-md text-[21px] italic leading-relaxed text-ivory/90">
            For new releases, behind-the-scenes magic, and a little conversation
            between worlds, find me on Instagram.
          </p>
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-10"
            >
              Message me on Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}