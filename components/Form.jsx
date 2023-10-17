import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-col w-full max-w-md flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="form_textarea"
            required
          />
        </label>

        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag {` `}
            <span className="italic font-normal text-gray-500">
              (ex: #marketing, #idea, #web,...)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>

        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link
            href="/"
            className="text-sm text-gray-500 duration-300 hover:text-primary-orange"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-orange-500 rounded-full text-white duration-300 hover:bg-orange-600 active:scale-90"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
