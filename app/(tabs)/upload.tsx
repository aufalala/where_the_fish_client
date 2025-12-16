import { useState } from "react";
import { CameraCapture } from "../../src/components/upload/CameraCapture";
import { PreviewForm } from "../../src/components/upload/PreviewForm";
import { usePhotoUpload } from "../../src/hooks/usePhotoUpload";

export default function Upload() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const { loading, submitPost } = usePhotoUpload();

  if (!photoUri) return <CameraCapture onCapture={setPhotoUri} />;

  return (
    <PreviewForm
      photoUri={photoUri}
      title={title}
      setTitle={setTitle}
      onSubmit={() => submitPost(photoUri, title).then(() => { setPhotoUri(null); setTitle(""); })}
      onRetake={() => setPhotoUri(null)}
      loading={loading}
    />
  );
}
