import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import type { Setting } from "../../types/Setting";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function SettingComponent() {
  const { settings, isLoading, isError, error } = useSettings();
  const { updateSettings, isPending } = useUpdateSettings();
  // const isLoading2 = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: Partial<Setting>) {
    updateSettings(
      { settingsToUpdate: data },
      {
        onSuccess: () => {
          toast.success("Successfully saved");
        },
      },
    );
  }

  return (
    <div className="space-y-8">
      {isLoading && (
        <div className="p-10 text-center">
          <Spinner>加载用户设置...</Spinner>
        </div>
      )}

      {isError && (
        <div className="p-10 text-center text-red-500">
          错误: {error?.message}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-lg text-gray-600">
              Personalize your outfit experience
            </p>
          </div>

          <form
            className="space-y-6 rounded-xl bg-white p-6 shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* 地理位置设置 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                defaultValue={settings?.location}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter city name"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message as string}
                </p>
              )}
            </div>

            {/* 穿搭风格偏好 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Style Preference
              </label>
              <select
                defaultValue={settings?.style}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                {...register("style", {
                  required: "Style preference is required",
                })}
              >
                <option value="casual">Casual</option>
                <option value="sporty">Sporty</option>
                <option value="formal">Formal</option>
                <option value="elegant">Elegant</option>
              </select>
            </div>

            {/* 温度单位 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Temperature Unit
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="celsius"
                    defaultChecked={settings?.temperatureUnit === "celsius"}
                    className="text-indigo-600 focus:ring-indigo-500"
                    {...register("temperatureUnit", {
                      required: "Temperature unit is required",
                    })}
                  />
                  <span className="ml-2">Celsius (°C)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="fahrenheit"
                    defaultChecked={settings?.temperatureUnit === "fahrenheit"}
                    className="text-indigo-600 focus:ring-indigo-500"
                    {...register("temperatureUnit", {
                      required: "Temperature unit is required",
                    })}
                  />
                  <span className="ml-2">Farenheit (°F)</span>
                </label>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="pt-4">
              <button
                disabled={isPending}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {isPending ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default SettingComponent;
