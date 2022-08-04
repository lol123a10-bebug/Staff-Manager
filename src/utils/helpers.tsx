export const handleChange = (e, func) => {
  const regexs = [/[0-9]/, /[-!$@#%^&*()_+|~=`{}[\]:";'<>?,./\\]/];
  for (const rgx of regexs) {
    if (rgx.test(e.currentTarget.value)) {
      e.currentTarget.value = e.currentTarget.value.replace(rgx, "");
    }
  }
  if (e.currentTarget.value.includes(" ")) {
    e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
  }
  return func(e);
};

export const capitalizeText = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
