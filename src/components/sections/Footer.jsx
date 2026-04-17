function Footer({ data, contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/8">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center text-sm text-[#43392e] sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
        <p>{data.copy.replace('{year}', year)}</p>
        <div className="flex flex-col gap-2 break-all sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:justify-end">
          <a href={`tel:${contact.phoneRaw}`}>{contact.phoneLabel}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
