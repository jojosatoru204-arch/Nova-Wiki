"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleCard } from "@/components/ArticleCard";
import { LiveUpdateBanner } from "@/components/LiveUpdateBanner";
import { useArticlesRealtime } from "@/hooks/useArticlesRealtime";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, TrendingUp } from "lucide-react";

export default function HomePage() {
  const { data, isLoading, isFetching, newArticleIds, lastUpdate } = useArticlesRealtime();

  return (
    <div className="min-h-screen">
      <Header onUpdate={lastUpdate} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 py-8">
          <section className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Bách khoa toàn thư thế hệ mới
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              WikiNova
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Khám phá tri thức nhân loại với giao diện hiện đại, cập nhật realtime mỗi phút.
            </p>
          </section>

          <LiveUpdateBanner
            lastUpdate={lastUpdate}
            isFetching={isFetching}
            newCount={newArticleIds.size}
          />

          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.articles.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isNew={newArticleIds.has(article.id)}
                  index={i}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}