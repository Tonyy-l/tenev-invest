function Footer({ data, contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{data.copy.replace('{year}', year)}</p>
        <div className="flex flex-col gap-2 break-all sm:flex-row sm:items-center sm:gap-6">
          <a href={`tel:${contact.phoneRaw}`}>{contact.phoneLabel}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
